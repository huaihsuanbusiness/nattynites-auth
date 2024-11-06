import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import Main from "./Main";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const App = () => (
  <DynamicContextProvider
    theme="auto"
    settings={{
      environmentId: "c0d00915-cd27-4451-a4a7-47eae20f24b3",
      walletConnectors: [EthereumWalletConnectors],
    }}
  >
    <Main />
  </DynamicContextProvider>
);

export default App;