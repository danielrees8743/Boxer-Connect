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

interface ICoach {
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
  passwordConfirm?: string;
  role?: string;
  contactNumber?: number;
  club?: IClub;
  accountConfirmed?: boolean;
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

export { IConfig, ITheme, IClub, IBoxer, ICoach, IFights };
