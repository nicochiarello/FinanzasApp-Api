import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}
  @Get('mine')
  getBalance(@Req() req) {
    const user = req['user'];
    const userId = user.sub;
    return this.balanceService.getBalance(userId);
  }
}
