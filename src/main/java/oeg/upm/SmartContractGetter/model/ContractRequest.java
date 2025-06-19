package oeg.upm.SmartContractGetter.model;

public class ContractRequest {
    private String url;
    private String blocks;
    private String api;

    public ContractRequest() {}

    public ContractRequest(String url, String blocks, String api) {
        this.url = url;
        this.blocks = blocks;
        this.api = api;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getBlocks() {
        return blocks;
    }

    public void setBlocks(String blocks) {
        this.blocks = blocks;
    }

    public String getApi() {
        return api;
    }

    public void setApi(String api) {
        this.api = api;
    }
}