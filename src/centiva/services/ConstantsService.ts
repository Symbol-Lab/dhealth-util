import { NetworkType } from "../..";

export class Constants {
  constructor(
    public networkType: NetworkType,
    private approvalAuthorityAddress: string,
    private sinkAddress: string
  ) { }

  public NEM_NODE = {
    MAIN_NET: [
      { protocol: 'https', domain: 'shibuya.supernode.me', port: 7891 },
      { protocol: 'https', domain: 'pegatennnag.supernode.me', port: 7891 },
      { protocol: 'https', domain: 'snnode.supernode.me', port: 7891 },
      { protocol: 'https', domain: 'super-nem.love', port: 7891 },
      { protocol: 'https', domain: 'sn1.tamami-foundation.org', port: 7891 },
      { protocol: 'https', domain: 'nemlovely6.supernode.me', port: 7891 },
      { protocol: 'https', domain: 'nemlovely5.supernode.me', port: 7891 },
    ]
    ,
    TEST_NET: [
      { protocol: 'http', domain: '210.166.75.236', port: 7890 },
      //   { protocol: 'http', domain: '192.3.61.243', port: 7890 }
    ]
  };

  public SEEKER_PERMISSION = {
    SEEKER_APPROVED: 1,
    SEEKER_DISAPPROVED: 2
  };

  public LOAD_PAGE_TXS = 1;

  public getApprovevalAuthorityAddress(): string {
    return this.approvalAuthorityAddress;
  }

  public getSinkAddress(): string {
    return this.sinkAddress;
  }

}
