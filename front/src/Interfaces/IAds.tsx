export interface ICreateAds {
    name: string;
    img:string;
    type: AdType;
    link:string;
    id?:string;
}

export enum AdType {
    A = 'A',
    B = 'B',
  }