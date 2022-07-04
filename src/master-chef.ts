import { BigInt } from "@graphprotocol/graph-ts"
import {
  MasterChef,
  Deposit,
  EmergencyWithdraw,
  OwnershipTransferred,
  Withdraw
} from "../generated/MasterChef/MasterChef"
import { DepositTxn ,EmergencyWithdrawalTxn,WithdrawTxn } from "../generated/schema"

export function handleDeposit(event: Deposit): void {

  let deposit = DepositTxn.load(event.transaction.from.toHex())

  if (!deposit) {
    deposit = new DepositTxn(event.transaction.from.toHex())
    deposit.count = BigInt.fromI32(0)
  }

  deposit.count = deposit.count.plus(BigInt.fromI32(1)) 
  deposit.user = event.params.user
  deposit.pid = event.params.pid
  deposit.amount = event.params.amount.toBigDecimal()
  deposit.save()
}

export function handleEmergencyWithdraw(event: EmergencyWithdraw): void {

  let emergencyTxn = EmergencyWithdrawalTxn.load(event.transaction.from.toHex())

   if (!emergencyTxn) {
    emergencyTxn = new EmergencyWithdrawalTxn(event.transaction.from.toHex())
   // entity.count = BigInt.fromI32(0)
  }
  emergencyTxn.user = event.params.user
  emergencyTxn.pid = event.params.pid
  emergencyTxn.amount = event.params.amount.toBigDecimal()
  emergencyTxn.save()

  
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleWithdraw(event: Withdraw): void {

  let withdraw = WithdrawTxn.load(event.transaction.from.toHex())

   if (!withdraw) {
    withdraw = new WithdrawTxn(event.transaction.from.toHex())
  }
  withdraw.user = event.params.user
  withdraw.pid = event.params.pid
  withdraw.amount = event.params.amount.toBigDecimal()
  withdraw.save()

}
