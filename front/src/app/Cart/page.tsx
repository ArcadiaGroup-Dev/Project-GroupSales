"use client";

import CartPage from "../../components/Cart/Cart";

function Page() {
  return (
    <div>
      <CartPage
        cartItems={[]}
        onCheckout={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}

export default Page;
