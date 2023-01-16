interface IConfig {
  app: {
    portProd: number | string;
    portDev: number | string;
    name?: string;
  };
  db: {
    collection?: string;
    userName?: string;
    password?: string;
  };
  email: {
    host?: string | undefined;
    port?: string | number;
    auth?: {
      user?: string;
      pass?: string;
    };
  };
  jwt: {
    secret?: string;
    expiresIn?: string;
    cookieExpiresIn?: string;
  };
}

//! Need to look at this maybe a generic !!
//! Need to remove this as it's not needed in here, can be used as normal
interface ITheme {
  info: (message: string) => void;
  error: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  log: (message: string) => void;
}

interface IClub {
  name?: string;
  division?: string;
  clubId: string;
  contactEmail?: string;
  contactName?: string;
}

interface IBoxer {
  club?: IClub;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  coach?: string;
  dob: Date;
  age?: number;
  email?: string;
  weight?: number;
  height?: number;
  stance?: string;
  picture?: string;
  id?: string;
  fights?: IFights;
  licenseNumber?: string;
  fitToFight?: boolean;
}

type Role = 'Head-Coach' | 'Assistant-Coach' | 'Boxer';
interface ICoach {
  id(id: string): string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
  passwordConfirm?: string;
  role?: Role;
  contactNumber?: string;
  club?: IClub;
  accountConfirmed?: boolean;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active?: boolean;
  correctPassword: (
    password: string,
    passwordConfirm: string
  ) => Promise<boolean>;
  changedPasswordAfter: (JWTTimestamp: number) => boolean;
  createRandomPasswordToken: () => string;
}

interface IFights {
  fighter?: IBoxer;
  wins?: number[];
  draws?: number[];
  losses?: number[];
  opponent?: {
    boxer?: IBoxer;
    date?: Date;
    location?: IClub;
    result?: string;
  };
}

interface ICookie {
  expires?: Date;
  httpOnly: boolean;
  secure: boolean;
}

export { IConfig, ITheme, IClub, IBoxer, ICoach, IFights, ICookie };
