import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHandle {
  constructor(private jwtService: JwtService) {}

  /**
   *
   * @param token  JWT
   * @returns
   */
  public getIdByToken(token: string) {
    const response = this.jwtService.verify(token);
    return response;
  }
}
