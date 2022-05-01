const Whitelist = artifacts.require("Whitelist");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Whitelist", function (/* accounts */) {
  it("should assert true", async function () {
    await Whitelist.deployed();
    if (Whitelist.maxWhitelistedAddress==10){
      return assert.isTrue(true);

    }
      else assert.isTrue(false);
  });
});
