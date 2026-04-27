class Company {

    id: bigint;
    industry: String;
    name: String;
    websiteurl: URL;
    location_ofhq: String;


    constructor(id: bigint, industry: String, name: String, websiteurl: URL, location_ofhq: String) {
        this.id = id;
        this.industry = industry;
        this.name = name;
        this.websiteurl = websiteurl;
        this.location_ofhq = location_ofhq;
    }
}
