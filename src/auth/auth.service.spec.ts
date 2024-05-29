import { Test, TestingModule } from "@nestjs/testing";
import { LoggerService } from '../common/service/logger.service';
import { AuthService } from "./auth.service";
import { UserService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UnauthorizedException, ForbiddenException } from "@nestjs/common";

const mockUser = {
  email: "test@example.com",
  _id: "12345",
  password: "mockAccessToken", // This should be hashed
};

const hashedPassword = bcrypt.hashSync("password", 10); // Hash the password

const expectedResponse = {
  access_token: "eyJhbGciOiJIUzI1NiJ9.sss.aaaaa",
  refresh_token: "eyJhbGciOiJIUzI1NiJ9.sss.aaaaa",
};

describe("AuthService", () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneUser: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockResolvedValue({ ...mockUser, hashdRt: hashedPassword }),
            updateOne: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(expectedResponse),
            compare: jest
              .fn()
              .mockImplementation((password, hashed) =>
                bcrypt.compareSync(password, hashed)
              ),
          },
        },
        {
          provide: LoggerService,
          useValue: {
            log: jest.fn(),
          },
        }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe("signIn", () => {
    it("should sign in a user and return an access token", async () => {
      const spyFindOneUser = jest
        .spyOn(userService, "findOneUser")
        .mockResolvedValue(mockUser);

      const spyCompare = jest.spyOn(bcrypt, "compare").mockReturnValue(true);

      const spySignAsync = jest
        .spyOn(jwtService, "signAsync")
        .mockResolvedValue("access_token");

      await authService.signIn("test@example.com", "password");
      expect(spyFindOneUser).toHaveBeenCalledWith("test@example.com");
      expect(spyCompare).toHaveBeenCalledWith("password", mockUser.password);
      expect(spySignAsync).toHaveBeenCalled();
    });

    it("should throw UnauthorizedException when passwords do not match.", async () => {
      jest.spyOn(userService, "findOneUser").mockResolvedValue(null)

      await expect(
        authService.signIn("test@example.com", "wrongpassword")
      ).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe("refreshTokens", () => {
    it("should refresh tokens for a user", async () => {
      const mockUserId = "12345";
      const mockRefreshToken = "mockRefreshToken";

      jest.spyOn(bcrypt, "compare").mockReturnValue(true); // Tokens match

      jest.spyOn(authService, "getTokens").mockResolvedValue(expectedResponse);

      const tokens = await authService.refreshTokens(mockUserId, mockRefreshToken);

      expect(tokens).toEqual(expectedResponse);
      expect(userService.updateOne).toHaveBeenCalledWith(
        mockUser._id,
        expect.objectContaining({ hashdRt: expect.any(String) })
      );
    });

    it("should throw ForbiddenException when user or hashed refresh token is invalid data must be a string or Buffer ", async () => {
      jest.spyOn(userService, "findOne").mockResolvedValue(null); // Invalid user

      await expect(
        authService.refreshTokens("invalidUserId", "invalidRefreshToken")
      ).rejects.toThrowError(new ForbiddenException('Access Denied.'));

      jest.spyOn(userService, "findOne").mockResolvedValue({ ...mockUser, hashdRt: "invalidHashedRT" }); // Invalid hashed refresh token

      await expect(
        authService.refreshTokens(mockUser._id, "invalidRefreshToken")
      ).rejects.toThrowError(new ForbiddenException('data must be a string or Buffer and salt must either be a salt string or a number of rounds'));
    });
  });

  describe("hashPassword", () => {
    it("should hash password correctly check", async () => {
      const plainPassword = "password";
      const hashed = await authService.hashPassword(plainPassword);

      expect(bcrypt.compareSync(plainPassword, hashed)).toBe(true);
    });
  });
});