// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol';
import './HYDNSealStorage.sol';

//import 'hardhat/console.sol';

contract HYDNSeal is
  Initializable,
  ContextUpgradeable,
  UUPSUpgradeable,
  OwnableUpgradeable,
  ERC1155URIStorageUpgradeable,
  HYDNSealStorage
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() external initializer {
    __Context_init();
    __UUPSUpgradeable_init();
    __Ownable_init();
    __ERC1155URIStorage_init();
    test1 = 1;
  }

  function _authorizeUpgrade(address newImplementation) internal override onlyOwner {
    newImplementation; // avoid empty block
  }

  function test() external view returns (uint256) {
    return test1;
  }
}
