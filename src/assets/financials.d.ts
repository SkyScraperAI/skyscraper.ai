export interface IFinancialsRoot {
    B2G: IFinancials;
    B2C: IFinancials;
    B2B: IFinancials;
}

export interface IFinancials {
    [key: string]: {
        "Salaries and Benefits": number;
        "Advertising & Marketing (Acquisition Costs)": number;
        "Product Development": number;
        "Product & Materials": number;
        "Legal and Accounting": number;
        Overhead: number;
        "# of Leads": number;
        "# of Orders": number;
        "# of Subscribers": number;
        "# of Purchases": number;
        "Cost of Goods Sold": number;
        "Net Revenues": number;
        "Total New Orders": number;
        "Total New Subscribers": number;
        "Net Burn": number;
        "Ending Cash Balance": number;
        [key: string]: number;
    };
}
