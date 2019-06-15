const DungeonsAndDragons = artifacts.require("./DungeonsAndDragons.sol");
contract("DungeonsAndDragons", accounts => {
  it("should match basic player sheet", async () => {
    const dyd = await DungeonsAndDragons.deployed();
    await dyd.setBasicCharacterSheet("Fuffy", "Fede", "Druid", 1, "Orc", 27, "Male");
    const playerSheet = await dyd.playerSheet.call();
	assert.equal(playerSheet.name, "Fuffy");
	assert.equal(playerSheet.player, "Fede");
	assert.equal(playerSheet.class, "Druid");
	assert.equal(playerSheet.level, 1);
	assert.equal(playerSheet.race, "Orc");
	assert.equal(playerSheet.age, 27);
	assert.equal(playerSheet.gender, "Male");
  });
});