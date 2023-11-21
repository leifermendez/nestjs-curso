import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../users/model/user.schema';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcryptjs';

// Mock para el servicio de JWT
const jwtServiceMock = {
  sign: jest.fn(() => 'mocked-token'),
};

// Mock del schema de mongo
const userModelMock = {
  findOne: jest.fn(),
  create: jest.fn(),
};

// Mock para el servicio de correo
const clientMailServiceMock = {
  emit: jest.fn(),
};


describe('Examen del AuthService', () => {
  let service: AuthService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        EventEmitter2,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        { provide: getModelToken(User.name), useValue: userModelMock },
        { provide: 'MAIL_SERVICE', useValue: clientMailServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Login', () => {
    it('should return token and user data on successful login', async () => {

      /**
       * Maqueta del Usuario
       */
      const userLoginBody: LoginAuthDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      /**
       * Maqueta de la respuesta de la base de datos de mongodb
       */
      const userExist = {
        toObject: jest.fn(() => ({
          _id: 'mocked-id',
          password: 'hashed-password'
        })),
      };


      userModelMock.findOne.mockResolvedValueOnce(userExist);
      jwtServiceMock.sign.mockReturnValueOnce('mocked-token');

      // Configura el comportamiento del mock para compareHash
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const result = await service.login(userLoginBody);


      expect(userModelMock.findOne).toHaveBeenCalledWith({ email: userLoginBody.email });
      expect(result).toEqual({ token: 'mocked-token', user: { _id: 'mocked-id' } });
    });

    it('should throw NOT_FOUND exception if user does not exist', async () => {
      const userLoginBody: LoginAuthDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      userModelMock.findOne.mockResolvedValueOnce(null);

      await expect(service.login(userLoginBody)).rejects.toThrowError('NOT_FOUND');
    });

    it('should throw PASSWORD_INVALID exception if password is incorrect', async () => {
      const userLoginBody: LoginAuthDto = {
        email: 'test@example.com',
        password: '123456',
      };

      const userExist = { _id: 'mocked-id', password: '12345678' };
      userModelMock.findOne.mockResolvedValueOnce(userExist);
      jwtServiceMock.sign.mockReturnValueOnce('mocked-token');

      await expect(service.login(userLoginBody)).rejects.toThrowError('PASSWORD_INVALID');
    });
  })


  describe('Register', () => {

    it('should create a new user and emit user.created event', async () => {

      const userBody: RegisterAuthDto = {
        email: 'newuser@example.com',
        password: 'password123',
        name: 'John Doe'
      };

      const newUser = { _id: 'mocked-id', email: 'newuser@example.com', password: 'hashed-password' };
      userModelMock.create.mockResolvedValueOnce(newUser);

      const userRegister = await service.register(userBody);

      expect(clientMailServiceMock.emit).toHaveBeenCalledWith('user.created', newUser);
      expect(userRegister._id).toEqual('mocked-id')
      expect(userRegister.email).toEqual('newuser@example.com')
      expect(userRegister.password).toEqual('hashed-password')
    });
    
  });

});
