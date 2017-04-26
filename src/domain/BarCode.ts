export class BarCode{
        
    constructor(
        public transid  :string,
        public name     :string,
        public format   :string,
        public factory  :string,
        public unit     :string,
        public batchno  :string,
        public qty      :number,
        public valid    :string,
        public prodate  :string,
        public zqty     :string,//整件数
        public sqty     :string,//散件数
        public price    :number
    ){}
}