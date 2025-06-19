package oeg.upm.SmartContractGetter.model;

public class ContractResponse {
    private String id;
    private String address;
    private String blockNumber;
    private String source;

    public ContractResponse() {}

    public ContractResponse(String id, String address, String blockNumber, String source) {
        this.id = id;
        this.address = address;
        this.blockNumber = blockNumber;
        this.source = source;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBlockNumber() {
        return blockNumber;
    }

    public void setBlockNumber(String blockNumber) {
        this.blockNumber = blockNumber;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}