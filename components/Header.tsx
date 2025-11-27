import React from "react";
import Container from "./Container";
import HeaderMenu from "./HeaderMenu";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Logs } from "lucide-react";
import { getMyOrders } from "@/sanity/queries";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }

  return (
    <header className="sticky top-0 z-50 py-3 md:py-4 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-lg">
      <Container className="flex items-center justify-between text-lightColor">
        <div className="w-auto md:w-1/3 flex items-center gap-2 md:gap-4 justify-start">
          <MobileMenu />
          <Link href="/" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-shop_dark_green to-shop_light_green bg-clip-text text-transparent">
            Doodle Blast
          </Link>
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end">
          <div className="flex items-center gap-4 md:gap-6">
            <CartIcon />
            <FavoriteButton />

            {user && (
              <Link
                href={"/orders"}
                className="group relative hover:text-shop_light_green transition-all duration-300 flex items-center"
              >
                <Logs className="w-5 h-5 md:w-6 md:h-6" />
                <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-shop_btn_dark_green text-white h-4 w-4 md:h-5 md:w-5 rounded-full text-[0.6rem] md:text-xs font-bold flex items-center justify-center shadow-lg">
                  {orders?.length ? orders?.length : 0}
                </span>
              </Link>
            )}

            <ClerkLoaded>
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-shop_light_green/30 hover:border-shop_light_green transition-all duration-300 shadow-md"
                    }
                  }}
                />
              </SignedIn>
              {!user && <SignIn />}
            </ClerkLoaded>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;