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

  it("should match stats player sheet", async () => {
    const dyd = await DungeonsAndDragons.deployed();
    await dyd.setStatsCharacterSheet(4, 6, 8, 10, 12, 18);
    const playerSheetStats = await dyd.playerSheetStats.call();
	assert.equal(playerSheetStats.strength, 4);
	assert.equal(playerSheetStats.strengthModifier, -3);
	assert.equal(playerSheetStats.dexterity, 6);
	assert.equal(playerSheetStats.dexterityModifier, -2);
	assert.equal(playerSheetStats.constitution, 8);
	assert.equal(playerSheetStats.constitutionModifier, -1)
	assert.equal(playerSheetStats.wisdom, 10);
	assert.equal(playerSheetStats.wisdomModifier, 0);
	assert.equal(playerSheetStats.intelligence, 12);
	assert.equal(playerSheetStats.intelligenceModifier, 1);
	assert.equal(playerSheetStats.charisma, 18);
	assert.equal(playerSheetStats.charismaModifier, 4);
  });
});