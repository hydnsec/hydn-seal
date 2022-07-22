// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol';
import './HYDNSealStorage1.sol';

//import 'hardhat/console.sol';

contract HYDNSeal1 is
  Initializable,
  ContextUpgradeable,
  UUPSUpgradeable,
  OwnableUpgradeable,
  ERC1155URIStorageUpgradeable,
  HYDNSealStorage1
{
  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() external reinitializer(2) {
    test2 = 2;
  }

  function _authorizeUpgrade(address newImplementation) internal override onlyOwner {
    newImplementation; // avoid empty block
  }

  function test() external view returns (uint256) {
    return test2;
  }
}
