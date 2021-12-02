package oeg.upm.SmartContractGetter;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.Transaction;
import org.web3j.protocol.core.methods.response.EthBlock.Block;
import org.web3j.protocol.core.methods.response.EthBlock.TransactionResult;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class SmartContractAnalyser {

	public static Web3jConnector web3j = new Web3jConnector();

	public SmartContractAnalyser() {
		web3j = SmartContractProvider.web3j;
	}

	public void getSmartContract(BigInteger blockNumber, BigInteger blockNumber2, String apiKey) throws IOException {
		//If the third parameter in the argument is a *, then the blockNumber2 equals -1, so thats mean that we want the lastest block
		if(blockNumber2 == BigInteger.valueOf(-1)) {
			blockNumber2 = web3j.getConnection().ethGetBlockByNumber(DefaultBlockParameterName.LATEST, true).send().getBlock().getNumber();
		}
		//Browse the blockchain
		for(int i = blockNumber.intValue(); i<= blockNumber2.intValue();i++){
			try {
				int tm = 0;
				Block block = web3j.getConnection().ethGetBlockByNumber(DefaultBlockParameter.valueOf(BigInteger.valueOf(i)), true).send().getBlock();
				for(int j=0; j<block.getTransactions().size(); j++) {
					TransactionResult<Transaction> tr = block.getTransactions().get(j);
					getEtherscanContracts(tr.get().getTo(), apiKey);
					tm++;
					if(tm == 5) {
						Thread.sleep(5000);
						tm = 0;
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public void getEtherscanContracts(String smartContractDir, String apikey) {
		try {
			URL url;
			url = new URL(ConfigTokens.ETHERSCANURL + smartContractDir + ConfigTokens.APIKEY + apikey);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("GET");
			con.getResponseCode();
			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer content = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				content.append(inputLine);
			}
			JsonObject  jobject = JsonParser.parseString(content.toString()).getAsJsonObject();
			Path path = Paths.get(ConfigTokens.CONTRACTFOLDER + smartContractDir + ConfigTokens.EXTENSION);
			if(jobject.get(ConfigTokens.MESSAGE).getAsString().contentEquals(ConfigTokens.OK) && !Files.exists(path)) {
				JsonArray jarray = jobject.getAsJsonArray(ConfigTokens.RESULT);
				jobject = jarray.get(0).getAsJsonObject();
				String result = jobject.get(ConfigTokens.SOURCECODE).getAsString();
				if(!jobject.get(ConfigTokens.SOURCECODE).getAsString().isEmpty()) {
					File file = new File(ConfigTokens.CONTRACTFOLDER + smartContractDir + ConfigTokens.EXTENSION);
					writerToFile(file, result);
					in.close();
					con.disconnect();
				}
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void writerToFile(File file, String toFile) {
		try {
			FileWriter fileWriter = new FileWriter(file);
			fileWriter.write(toFile);
			fileWriter.flush();
			fileWriter.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
