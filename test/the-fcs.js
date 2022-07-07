const TheFunixCryptoSim = artifacts.require("TheFunixCryptoSim");

contract("TheFunixCryptoSim", function (/* accounts */) {
  let instance;

  before(async function () {
    instance = await TheFunixCryptoSim.deployed();
  });

  describe("Contract", function () {
    it("should deployed", function () {
      return assert.isTrue(instance !== undefined);
    });
  });

  // *** Start Code here ***

  describe('Token Information', function () {
    it('check token', async function () {
      let symbol = await instance.symbol();
      return assert.equal(symbol, 'FCS');
    });

    it('check token name', async function () {
      let name = await instance.name();
      return assert.equal(name, 'TheFunixCryptoSims');
    });
  })

  // Test case kiểm tra thuộc tính của Genesis thứ nhất.

  describe('Genesis Information', function () {
    it('checks the properties of the first Genesis', async function () {

      return await instance.getSimDetails(0)
        .then(function (result) {
          assert.equal(0, result[1].body);
          assert.equal(0, result[1].eye);
          assert.equal(0, result[1].hairstyle);
          assert.equal(0, result[1].outfit);
          assert.equal(0, result[1].accessory);
          assert.equal(0, result[1].hiddenGenes);
          assert.equal(0, result[1].generation);
        })
    })

    it('checks the properties of the second Genesis', async function () {

      return await instance.getSimDetails(1)
        .then(function (result) {
          assert.equal(3, result[1].body);
          assert.equal(7, result[1].eye);
          assert.equal(127, result[1].hairstyle);
          assert.equal(31, result[1].outfit);
          assert.equal(31, result[1].accessory);
          assert.equal(0, result[1].hiddenGenes);
          assert.equal(0, result[1].generation);
        })
    })
  })

  describe('Hybrid Algorithm', function () {
    describe('Check hiddenGenes X', function () {

      it('If M = S', async function () {

        let x;
        let result1;
        let result2;

        return await instance.getSimDetails(0)
          .then(async function (r) {
            result1 = r;
            return await instance.getSimDetails(1)
          })
          .then(function (r) {
            result2 = r;
            assert.equal(result1[1].hiddenGenes, result2[1].hiddenGenes);
            return x = (result1[1].hiddenGenes * result2[1].hiddenGenes + 3) % 4
          })
      });

      it('If M > S', async function () {
        let x;
        let result1;
        let result2;
        return await instance.buySim()
          .then(async function () {
            return await instance.getSimDetails(2)
          })
          .then(async function (r) {
            result1 = r;
            return await instance.getSimDetails(0);
          })
          .then(function (r) {
            result2 = r;
            assert.equal(true, result1[1].hiddenGenes > result2[1].hiddenGenes);
            return x = result1[1].hiddenGenes;
          })
      });

      it('If M < S', async function () {
        let x;
        let result1;
        let result2;

        return await instance.getSimDetails(0)
          .then(async function (r) {
            result1 = r;
            return await instance.buySim();
          })
          .then(async function () {
            return await instance.getSimDetails(2)
          })
          .then(function (r) {
            result2 = r;
            // console.log(result2);
            assert.equal(true, result1[1].hiddenGenes < result2[1].hiddenGenes);
            return x = result2[1].hiddenGenes;
          })
      });
    })

    describe('Check the properties of the second Genesis', async function () {

      it('test case 01', async function () {
        let result1;
        let result2;
        let result3;
        return await instance.getSimDetails(0)
          .then(async function (r) {
            result1 = r;
            return await instance.getSimDetails(2);
          })
          .then(async function (r) {
            result2 = r;
            return await instance.buySim();
          })
          .then(async function () {
            return await instance.getSimDetails(3);
          })
          .then(function (r) {
            result3 = r;
            assert.equal(result3[1].hiddenGenes, result2[1].hiddenGenes);
            assert.equal(result3[1].generation, parseInt(result2[1].generation) + 1)
          });
      });

      it('test case 02', async function () {
        let result1;
        let result2;
        let result3;
        return await instance.getSimDetails(0)
          .then(async function (r) {
            result1 = r;
            return await instance.getSimDetails(3);
          })
          .then(async function (r) {
            result2 = r;
            return await instance.buySim();
          })
          .then(async function () {
            return await instance.getSimDetails(4);
          })
          .then(function (r) {
            result3 = r;
            assert.equal(result3[1].hiddenGenes, result2[1].hiddenGenes);
            assert.equal(result3[1].generation, parseInt(result2[1].generation) + 1)
          });
      });

      it('test case 03', async function () {
        let result1;
        let result2;
        let result3;
        return await instance.getSimDetails(0)
          .then(async function (r) {
            result1 = r;
            return await instance.getSimDetails(4);
          })
          .then(async function (r) {
            result2 = r;
            return await instance.buySim();
          })
          .then(async function () {
            return await instance.getSimDetails(5);
          })
          .then(function (r) {
            result3 = r;
            assert.equal(result3[1].hiddenGenes, result2[1].hiddenGenes);
            assert.equal(result3[1].generation, parseInt(result2[1].generation) + 1)
          });
      });

      it('test case 04', async function () {
        let result1;
        let result2;
        let result3;
        return await instance.getSimDetails(0)
          .then(async function (r) {
            result1 = r;
            return await instance.getSimDetails(5);
          })
          .then(async function (r) {
            result2 = r;
            return await instance.buySim();
          })
          .then(async function () {
            return await instance.getSimDetails(6);
          })
          .then(function (r) {
            result3 = r;
            assert.equal(result3[1].hiddenGenes, result2[1].hiddenGenes);
            assert.equal(result3[1].generation, parseInt(result2[1].generation) + 1)
          });
      });

      it('test case 05', async function () {
        let result1;
        let result2;
        let result3;
        return await instance.getSimDetails(0)
          .then(async function (r) {
            result1 = r;
            return await instance.getSimDetails(6);
          })
          .then(async function (r) {
            result2 = r;
            return await instance.buySim();
          })
          .then(async function () {
            return await instance.getSimDetails(7);
          })
          .then(function (r) {
            result3 = r;
            assert.equal(result3[1].hiddenGenes, result2[1].hiddenGenes);
            assert.equal(result3[1].generation, parseInt(result2[1].generation) + 1)
          });
      });

      it('test case 05', async function () {
        let result1;
        let result2;
        let result3;
        return await instance.getSimDetails(0)
          .then(async function (r) {
            result1 = r;
            return await instance.getSimDetails(7);
          })
          .then(async function (r) {
            result2 = r;
            return await instance.buySim();
          })
          .then(async function () {
            return await instance.getSimDetails(8);
          })
          .then(function (r) {
            result3 = r;
            assert.equal(result3[1].hiddenGenes, result2[1].hiddenGenes);
            assert.equal(result3[1].generation, parseInt(result2[1].generation) + 1)
          });
      });

      it('test case 06', async function () {
        let result1;
        let result2;
        let result3;
        return await instance.getSimDetails(0)
          .then(async function (r) {
            result1 = r;
            return await instance.getSimDetails(8);
          })
          .then(async function (r) {
            result2 = r;
            return await instance.buySim();
          })
          .then(async function () {
            return await instance.getSimDetails(9);
          })
          .then(function (r) {
            result3 = r;
            assert.equal(result3[1].hiddenGenes, result2[1].hiddenGenes);
            assert.equal(result3[1].generation, parseInt(result2[1].generation) + 1)
          });
      });

      it('test case 07', async function () {
        let result1;
        let result2;
        let result3;
        return await instance.getSimDetails(0)
          .then(async function (r) {
            result1 = r;
            return await instance.getSimDetails(9);
          })
          .then(async function (r) {
            result2 = r;
            return await instance.buySim();
          })
          .then(async function () {
            return await instance.getSimDetails(10);
          })
          .then(function (r) {
            result3 = r;
            assert.equal(result3[1].hiddenGenes, result2[1].hiddenGenes);
            assert.equal(result3[1].generation, parseInt(result2[1].generation) + 1)
          });
      });

      it('test case 08', async function () {
        let result1;
        let result2;
        let result3;
        return await instance.getSimDetails(0)
          .then(async function (r) {
            result1 = r;
            return await instance.getSimDetails(10);
          })
          .then(async function (r) {
            result2 = r;
            return await instance.buySim();
          })
          .then(async function () {
            return await instance.getSimDetails(11);
          })
          .then(function (r) {
            result3 = r;
            console.log('simId11', result3)
            assert.equal(result3[1].hiddenGenes, result2[1].hiddenGenes);
            assert.equal(result3[1].generation, parseInt(result2[1].generation) + 1)
          });
      });

    })
  })

  describe('Advanced', function () {
    it('Check the data range of the attributes', async function () {

      let result;
      return await instance.getSimDetails(11)
        .then(function (r) {
          result = r;
          assert.equal(true, result[1].body >= 0);
          assert.equal(true, result[1].body <= 3);

          assert.equal(true, result[1].eye >= 0);
          assert.equal(true, result[1].eye <= 7);

          assert.equal(true, result[1].hairstyle >= 0);
          assert.equal(true, result[1].hairstyle <= 127);

          assert.equal(true, result[1].outfit >= 0);
          assert.equal(true, result[1].outfit <= 31);

          assert.equal(true, result[1].accessory >= 0);
          assert.equal(true, result[1].accessory <= 31);

          assert.equal(true, result[1].hiddenGenes >= 0);
          assert.equal(true, result[1].hiddenGenes <= 3);

          assert.equal(true, result[1].generation >= 0);
          assert.equal(true, result[1].generation <= 255);
        })
    })
  })

  // *** End Code here ***
});
