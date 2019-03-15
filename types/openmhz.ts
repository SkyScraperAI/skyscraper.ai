export interface IFreqList {
  _id: string;
  pos: number;
  freq: number;
  len: number;
  spikes: number;
  error: number;
}

export interface IOpenMHzResponse {
  _id: string;
  shortName: string;
  talkgroupNum: number;
  objectKey: string;
  endpoint: string;
  bucket: string;
  time: string;
  name: string;
  freq: number;
  url: string;
  emergency: boolean;
  path: string;
  srcList: any[];
  freqList: IFreqList[];
  len: number;
  type: string;
  talkgroup?: IOpenMHzTalkgroup;
  updatedAt: Date;
}

export interface IOpenMHzTalkgroup {
  _id: string;
  shortName: string;
  priority: number;
  group: string;
  tag: string;
  description: string;
  mode: string;
  alpha: string;
  num: number;
  __v: number;
}

export interface IOpenMHzTalkgroups {
  [key: string]: IOpenMHzTalkgroup;
}

export interface IOpenMHzTalkgroupResponse {
  talkgroups: IOpenMHzTalkgroups;
}
