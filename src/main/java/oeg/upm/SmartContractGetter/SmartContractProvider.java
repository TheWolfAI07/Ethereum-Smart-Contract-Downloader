package oeg.upm.SmartContractGetter;

import com.google.gson.JsonIOException;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigInteger;

public class SmartContractProvider {

    private final SmartContractAnalyser results = new SmartContractAnalyser();
    public static Web3jConnector web3j = new Web3jConnector();

    public void configure(JsonObject arg0) {
        if (arg0.get(ConfigTokens.URL) != null) {
            web3j.setConnection(Web3j.build(new HttpService(arg0.get(ConfigTokens.URL).getAsString())));
        }
        if (arg0.get(ConfigTokens.BLOCKS) != null && arg0.get(ConfigTokens.API) != null) {
            if (arg0.get(ConfigTokens.BLOCKS).getAsString().contentEquals(ConfigTokens.ASTERISK)) {
                getBlockData(Integer.parseInt(arg0.get(ConfigTokens.BLOCKS).getAsString()), null, arg0.get(ConfigTokens.API).getAsString());
            } else if (arg0.get(ConfigTokens.BLOCKS).getAsString().contains(ConfigTokens.DASH)) {
                String[] msg = arg0.get(ConfigTokens.BLOCKS).getAsString().split(ConfigTokens.DASH);
                int x = Integer.parseInt(msg[0]);
                if (msg[1].contentEquals(ConfigTokens.ASTERISK)) {
                    msg[1] = "-1";
                }
                int y = Integer.parseInt(msg[1]);
                getBlockData(x, y, arg0.get(ConfigTokens.API).getAsString());
            } else {
                getBlockData(Integer.parseInt(arg0.get(ConfigTokens.BLOCKS).getAsString()), null, arg0.get(ConfigTokens.API).getAsString());
            }
        }
    }

    /**
     * This function retrieve a block or a list of block, in JSON.
     */
    public void getBlockData(Integer blockNum1, Integer blockNum2, String apiKey) {
        try {
            if (blockNum1 == -1) {
                //If the second element of the list is *, the blockNum1 is 0 and the blockNum2 is -1
                results.getSmartContract(BigInteger.valueOf(0), BigInteger.valueOf(blockNum1), apiKey);
            } else if (blockNum2 == null) {
                //If the user only wants 1 element, we only iterate 1 block
                results.getSmartContract(BigInteger.valueOf(blockNum1), BigInteger.valueOf(blockNum1), apiKey);
            } else {
                //To iterate between blocks or one block to the final block.
                results.getSmartContract(BigInteger.valueOf(blockNum1), BigInteger.valueOf(blockNum2), apiKey);
            }
        } catch (IOException | NullPointerException e) {
            e.getMessage();
        }
    }

    public static void main(String[] args) {
        JsonObject jsonObject = new JsonObject();
        try {
            File directory = new File(String.valueOf("Contracts"));
            if (!directory.exists()) {
                directory.mkdir();

            }
            jsonObject = JsonParser.parseReader(new FileReader("config.json")).getAsJsonObject();
            ;
            SmartContractProvider ec = new SmartContractProvider();
            ec.configure(jsonObject);
        } catch (JsonIOException | JsonSyntaxException | FileNotFoundException e) {
            e.printStackTrace(); // Log the exception for debugging
            e.printStackTrace();
        }
    }

}
