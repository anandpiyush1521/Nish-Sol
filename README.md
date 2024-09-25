# Nish-Sol

Welcome to the **Solana Wallet App**! This is a React-based application designed to interact with the Solana blockchain. It allows users to connect their Solana wallet, view balances, receive airdrops, and disconnect their wallet seamlessly.

![Solana Wallet UI](https://path-to-screenshot-or-gif) <!-- You can replace this with an actual screenshot link -->

## Features

- **Connect Wallet**: Easily connect to any Solana wallet using the `@solana/wallet-adapter-react` and `@solana/wallet-adapter-react-ui`.
- **View Balance**: Once connected, users can view their wallet's SOL balance in real-time.
- **Airdrop Request**: Request airdrops directly to the connected wallet, with adjustable SOL amounts.
- **Auto Balance Refresh**: The wallet balance refreshes every 10 seconds automatically.
- **Disconnect Wallet**: Securely disconnect your wallet with a simple button press.
- **Toaster Notifications**: Feedback notifications are displayed for successful and failed actions.

## Getting Started

Follow the steps below to get the app running on your local machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) (Optional, if you want to interact with Solana via the CLI)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/solana-wallet-app.git
    cd solana-wallet-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

### Environment Setup

Make sure you set up your environment correctly before running the app. Create a `.env` file in the root directory and add your configurations:

```plaintext
NEXT_PUBLIC_NETWORK_URL=https://api.devnet.solana.com
NEXT_PUBLIC_COMMITMENT=confirmed
