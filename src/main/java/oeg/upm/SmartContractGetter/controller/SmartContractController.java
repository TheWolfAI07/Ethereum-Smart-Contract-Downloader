package oeg.upm.SmartContractGetter.controller;

import com.google.gson.JsonObject;
import oeg.upm.SmartContractGetter.SmartContractProvider;
import oeg.upm.SmartContractGetter.model.ContractRequest;
import oeg.upm.SmartContractGetter.model.ContractResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/contracts")
public class SmartContractController {

    private final SmartContractProvider contractProvider = new SmartContractProvider();

    @PostMapping
    public ResponseEntity<List<ContractResponse>> extractContracts(@RequestBody ContractRequest request) {
        try {
            // Create JsonObject from request
            JsonObject jsonConfig = new JsonObject();
            jsonConfig.addProperty("url", request.getUrl());
            jsonConfig.addProperty("blocks", request.getBlocks());
            jsonConfig.addProperty("api", request.getApi());

            // Configure the provider
            contractProvider.configure(jsonConfig);

            // For now, return mock data
            // In a real implementation, you would get the actual contracts from the provider
            List<ContractResponse> mockContracts = new ArrayList<>();
            mockContracts.add(new ContractResponse(
                UUID.randomUUID().toString(),
                "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                request.getBlocks(),
                "contract SimpleStorage {\n    uint storedData;\n\n    function set(uint x) public {\n        storedData = x;\n    }\n\n    function get() public view returns (uint) {\n        return storedData;\n    }\n}"
            ));
            mockContracts.add(new ContractResponse(
                UUID.randomUUID().toString(),
                "0x8Ba1f109551bD432803012645Ac136ddd64DBA72",
                request.getBlocks(),
                "pragma solidity ^0.8.0;\n\ncontract Token {\n    string public name = \"Example Token\";\n    string public symbol = \"EXT\";\n    uint8 public decimals = 18;\n    uint256 public totalSupply = 1000000 * (10 ** uint256(decimals));\n\n    mapping(address => uint256) public balanceOf;\n    mapping(address => mapping(address => uint256)) public allowance;\n\n    event Transfer(address indexed from, address indexed to, uint256 value);\n    event Approval(address indexed owner, address indexed spender, uint256 value);\n\n    constructor() {\n        balanceOf[msg.sender] = totalSupply;\n    }\n\n    function transfer(address to, uint256 value) public returns (bool success) {\n        require(balanceOf[msg.sender] >= value);\n        balanceOf[msg.sender] -= value;\n        balanceOf[to] += value;\n        emit Transfer(msg.sender, to, value);\n        return true;\n    }\n\n    function approve(address spender, uint256 value) public returns (bool success) {\n        allowance[msg.sender][spender] = value;\n        emit Approval(msg.sender, spender, value);\n        return true;\n    }\n\n    function transferFrom(address from, address to, uint256 value) public returns (bool success) {\n        require(value <= balanceOf[from]);\n        require(value <= allowance[from][msg.sender]);\n        balanceOf[from] -= value;\n        balanceOf[to] += value;\n        allowance[from][msg.sender] -= value;\n        emit Transfer(from, to, value);\n        return true;\n    }\n}"
            ));

            return ResponseEntity.ok(mockContracts);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}