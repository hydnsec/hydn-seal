// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;
import '@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol';

//import 'hardhat/console.sol';

abstract contract HYDNSealStorage {
  using CountersUpgradeable for CountersUpgradeable.Counter;
  string public name;
  string public symbol;
  CountersUpgradeable.Counter public totalAudits;
}
