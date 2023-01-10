interface IConfig {
  app: {
    portProd: number | string;
    protDev: number | string;
    name?: string;
  };
  db: {
    collection?: string;
    userName?: string;
    password?: string;
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
  firstName?: string;
  lastName?: string;
  nickname?: string;
  dob: Date;
  age?: number;
  email?: string;
  club?: IClub;
  weight?: number;
  height?: number;
  wins?: number;
  losses?: number;
  draws?: number;
  stance?: string;
  id?: string;
  picture?: string;
  licenseNumber?: string;
  fitToFight?: boolean;
}

interface IUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
  passwordConfirm?: string;
  role?: string;
  contactNumber?: number;
  club?: IClub;
}
interface IFights {
  fighter?: IBoxer;
  opponent?: IBoxer;
  date: { Date: Date };
  results?: {
    location?: IClub;
    win?: string[];
    loss?: string[];
    draw?: string[];
  };
}

export { IConfig, ITheme, IClub, IBoxer, IUser, IFights };
