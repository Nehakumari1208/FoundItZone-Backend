const { verifyToken } = require("@clerk/backend");
const { Clerk } = require("@clerk/clerk-sdk-node");

const clerkClient = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

const authenticateClerk = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    const userId = payload.sub;

    const user = await clerkClient.users.getUser(userId);

    req.user = {
      id: userId,
      email: user.emailAddresses[0]?.emailAddress,
    };

    next();
  } catch (error) {
    console.error("❌ Clerk token verification failed:", error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticateClerk;
