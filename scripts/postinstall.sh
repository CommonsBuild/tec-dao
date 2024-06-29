if [ -z "$THEGRAPH_API_KEY" ]; then
  echo "Error: THEGRAPH_API_KEY is not set."
  exit 1
fi

find dist -type f -exec sed -i "s|https://api.thegraph.com/subgraphs/name/blossomlabs/aragon-optimism|https://gateway-arbitrum.network.thegraph.com/api/$THEGRAPH_API_KEY/subgraphs/id/GHtDCXqSdwYPgXSigMA21yRpAWDwiAxqsfYsEw7NLMPk|g" {} +
find dist -type f -exec sed -i "s|https://api.thegraph.com/subgraphs/name/blossomlabs/aragon-finance-optimism|https://gateway-arbitrum.network.thegraph.com/api/$THEGRAPH_API_KEY/subgraphs/id/7ZwQmdAJCVxAibnjCaTpj7w5bjQFamCdSPMqhWTjCVdh|g" {} +
find dist -type f -exec sed -i "s|https://api.thegraph.com/subgraphs/name/blossomlabs/aragon-an-delay-optimism|https://gateway-arbitrum.network.thegraph.com/api/$THEGRAPH_API_KEY/subgraphs/id/AN9Yt3j8Zd6McGttkiifZYHqAZ2W8FAwct6kPub1DxNi|g" {} +
find dist -type f -exec sed -i "s|https://api.thegraph.com/subgraphs/name/blossomlabs/aragon-bl-tao-voting-optimism|https://gateway-arbitrum.network.thegraph.com/api/$THEGRAPH_API_KEY/subgraphs/id/AoySFgHvnnTtfQW3prjSEPs5cMrDbuwNHpKa6xXFPoGL|g" {} +

echo "Applied postinstall script"
