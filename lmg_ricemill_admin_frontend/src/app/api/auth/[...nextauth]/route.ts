import NextAuth from "next-auth";
import authOptions from "@/utils/next_auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
