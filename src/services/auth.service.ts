import { userModel } from "../database/models/User.model";
import { bcryptUtil } from "../utils/bcrypt.util";
import { JwtUtil } from "../utils/jwt.util";

export class AuthService {
  static async Login(email: string, password: string) {
    const user = await userModel.findOne({ email });
    if (!user) {
      return null;
    }

    const isPasswordCorrect = await bcryptUtil.compare(password, user.password);
    if (!isPasswordCorrect) {
      return null;
    }

    const authToken = await JwtUtil.createToken(user.id);
    const data = {
      token: authToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };

    return data;
  }

  static async Register(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    role: string
  ) {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return null;
    }

    const hashedPass = await bcryptUtil.hash(password);
    const user = await userModel.create({
      id,
      email,
      password: hashedPass,
      firstName,
      lastName,
      role,
    });

    if (!user) {
      return null;
    }

    const authToken = await JwtUtil.createToken(user.id);
    const data = {
      token: authToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };

    return data;
  }
}

