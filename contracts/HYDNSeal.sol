// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol';
import './HYDNSealStorage.sol';

//import 'hardhat/console.sol';

contract HYDNSeal is
  Initializable,
  ContextUpgradeable,
  UUPSUpgradeable,
  OwnableUpgradeable,
  ERC1155URIStorageUpgradeable,
  ERC1155SupplyUpgradeable,
  HYDNSealStorage
{
  using CountersUpgradeable for CountersUpgradeable.Counter;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() external initializer {
    __Context_init();
    __UUPSUpgradeable_init();
    __Ownable_init();
    __ERC1155URIStorage_init();
    __ERC1155Supply_init();
    name = 'HYDN Seal';
    symbol = 'HYDNSEAL';
    _setBaseURI('ipfs://');
  }

  function _authorizeUpgrade(address newImplementation) internal override onlyOwner {
    newImplementation; // avoid empty block
  }

  function _beforeTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal virtual override(ERC1155SupplyUpgradeable, ERC1155Upgradeable) {
    super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
  }

  function safeTransferFrom(
    address,
    address,
    uint256,
    uint256,
    bytes memory
  ) public virtual override {
    revert('HYDNSeal: transfer not allowed');
  }

  function safeBatchTransferFrom(
    address,
    address,
    uint256[] memory,
    uint256[] memory,
    bytes memory
  ) public virtual override {
    revert('HYDNSeal: transfer batch not allowed');
  }

  function uri(uint256 tokenId)
    public
    view
    virtual
    override(ERC1155URIStorageUpgradeable, ERC1155Upgradeable)
    returns (string memory)
  {
    return super.uri(tokenId);
  }

  function mintSeal(address[] calldata _contracts, string memory tokenURI) external onlyOwner returns (bool success) {
    totalAudits.increment();
    uint256 id = totalAudits.current();
    _setURI(id, tokenURI);
    for (uint8 i = 0; i < _contracts.length; i++) {
      _mint(_contracts[i], id, 1, '');
    }
    return true;
  }
}
