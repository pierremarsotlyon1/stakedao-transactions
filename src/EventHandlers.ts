import { ERC20 } from "generated";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const CURVE_LOCKER = "0x52f541764E6e90eeBc5c21Ff570De0e2D63766B6";

ERC20.Transfer.handler(
  async ({ event, context }: { event: any, context: any }) => {
    context.Transfer.set({
      id: `${event.chainId}_${event.transaction.hash}_${event.block.number}_${event.logIndex}`,
      product: "curve",
      tx_type: "deposit",
      lp: event.srcAddress,
      amount: event.params.value,
      price: 0
    });
  },
  { wildcard: true, eventFilters: { from: ZERO_ADDRESS, to: CURVE_LOCKER } }
);

ERC20.Transfer.handler(
  async ({ event, context }: { event: any, context: any }) => {
    context.Transfer.set({
      id: `${event.chainId}_${event.transaction.hash}_${event.block.number}_${event.logIndex}`,
      product: "curve",
      tx_type: "withdraw",
      lp: event.srcAddress,
      amount: event.params.value,
      price: 0
    });
  },
  { wildcard: true, eventFilters: { from: CURVE_LOCKER, to: ZERO_ADDRESS } }
);
