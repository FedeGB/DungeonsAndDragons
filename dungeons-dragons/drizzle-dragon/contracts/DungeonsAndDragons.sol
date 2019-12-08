pragma solidity ^0.5.0;

contract DungeonsAndDragons {

	address public creator;
	uint public createdAt;

	mapping (address => int) public balances;

	struct BaiscCharacterRecordSheet {
		// address characterBlockDir;
		string name;
		string player;
		string class;
		uint64 level;
		string race;
		uint64 age;
		string gender;
	}

	struct StatsCharacterRecordSheet {
		uint64 strength;
		int64 strengthModifier;
		uint64 dexterity;
		int64 dexterityModifier;
		uint64 constitution;
		int64 constitutionModifier;
		uint64 wisdom;
		int64 wisdomModifier;
		uint64 intelligence;
		int64 intelligenceModifier;
		uint64 charisma;
		int64 charismaModifier;
	}

	struct SavingThrowCharacterStats {
		int64 fortitude;
		int64 reflex;
		int64 willpower;
	}

	struct CombatCharacterStats {
		int64 armorClass;
		int64 currentHitPoints;
		int64 totalHitPoints;
		int64 hitDice;
		int64 initiative;
		int64 baseBonusAttack;
	}

	BaiscCharacterRecordSheet public playerSheet;

	StatsCharacterRecordSheet public playerSheetStats;

	SavingThrowCharacterStats public playerSavingThrows;

	CombatCharacterStats public playerCombatStats;

	constructor() public payable {
	    creator = msg.sender;
	    createdAt = now;
	    balances[msg.sender] = 10000;
	}

	function compareStrings (string memory a, string memory b) public pure returns (bool) {
		return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
	}

	function setBasicCharacterSheet(string memory name, string memory player, string memory class, uint64 level, string memory race, uint64 age, string memory gender) public {
		require(msg.sender == creator, "Only the creator of it\'s own player sheet can modify it\'s data");
		playerSheet = BaiscCharacterRecordSheet({
			name: name,
			player: player,
			class: class,
			level: level,
			race: race,
			age: age,
			gender: gender
		});
	}

	function getStatModifier(uint64 stat) internal pure returns(int64) {
		if(stat == 3) return -4;
		if(stat > 3 && stat <= 5) return -3;
		if(stat > 5 && stat <= 7) return -2;
		if(stat > 7 && stat <= 9) return -1;
		if(stat > 9 && stat <= 11) return 0;
		if(stat > 11 && stat <= 13) return 1;
		if(stat > 13 && stat <= 15) return 2;
		if(stat > 15 && stat <= 17) return 3;
		if(stat == 18) return 4;
	}

	function setStatsCharacterSheet(uint64 strength, uint64 dexterity, uint64 constitution, uint64 wisdom, uint64 intelligence, uint64 charisma) public {
		require(msg.sender == creator, "Only the creator of it\'s own player sheet can modify it\'s data");
		require(compareStrings(playerSheet.class, "") == false, "Character class is not set");
		int64 strengthModifier = getStatModifier(strength);
		int64 dexterityModifier = getStatModifier(dexterity);
		int64 constitutionModifier = getStatModifier(constitution);
		int64 wisdomModifier = getStatModifier(wisdom);
		int64 intelligenceModifier = getStatModifier(intelligence);
		int64 charismaModifier = getStatModifier(charisma);
		playerSheetStats = StatsCharacterRecordSheet({
			strength: strength,
		 	strengthModifier: strengthModifier,
		 	dexterity: dexterity,
		 	dexterityModifier: dexterityModifier,
		 	constitution: constitution,
		 	constitutionModifier: constitutionModifier,
		 	wisdom: wisdom,
		 	wisdomModifier: wisdomModifier,
		 	intelligence: intelligence,
		 	intelligenceModifier: intelligenceModifier,
		 	charisma: charisma,
		 	charismaModifier: charismaModifier
		 });

		setCharacterSavingThrowStats(playerSheet.class, playerSheet.level);
	}

	function setCharacterSavingThrowStats(string memory class, uint64 level) public {
		int64 fortitude = getSavingThrow("fortitude", class, level) + playerSheetStats.constitutionModifier;
		int64 reflex = getSavingThrow("reflex", class, level) + playerSheetStats.dexterityModifier;
		int64 willpower = getSavingThrow("willpower", class, level) + playerSheetStats.wisdomModifier;
		playerSavingThrows =  SavingThrowCharacterStats({
			fortitude: fortitude,
			reflex: reflex,
			willpower: willpower
		});
	}

	function getSavingThrow(string memory saving, string memory class, uint64 level) internal pure returns(int64) {
		if(compareStrings("Rogue", class)) {
			if(compareStrings("fortitude", saving)){
				return getRogueFortitude(level);
			}
			if(compareStrings("reflex", saving)){
				return getRogueReflex(level);
			}
			if(compareStrings("willpower", saving)){
				return getRogueWillPower(level);
			}
		}
		if(compareStrings("Fighter", class)) {
			if(compareStrings("fortitude", saving)){
				return getFighterFortitude(level);
			}
			if(compareStrings("reflex", saving)){
				return getFighterReflex(level);
			}
			if(compareStrings("willpower", saving)){
				return getFighterWillPower(level);
			}
		}
		if(compareStrings("Barbarian", class)) {
			if(compareStrings("fortitude", saving)){
				return getBarbarianFortitude(level);
			}
			if(compareStrings("reflex", saving)){
				return getBarbarianReflex(level);
			}
			if(compareStrings("willpower", saving)){
				return getBarbarianWillPower(level);
			}
		}
		return 0;
	}

	function getRogueFortitude(uint64 level) internal pure returns(int64) {
		if(level == 1) return 0;
		if(level == 2) return 0;
		if(level == 3) return 1;
		if(level == 4) return 1;
		if(level == 5) return 1;
		if(level == 6) return 2;
		if(level == 7) return 2;
		if(level == 8) return 2;
		if(level == 9) return 3;
		if(level >= 10) return 3;
	}

	function getRogueReflex(uint64 level) internal pure returns(int64) {
		if(level == 1) return 2;
		if(level == 2) return 3;
		if(level == 3) return 3;
		if(level == 4) return 4;
		if(level == 5) return 4;
		if(level == 6) return 5;
		if(level == 7) return 5;
		if(level == 8) return 6;
		if(level == 9) return 6;
		if(level >= 10) return 7;
	}

	function getRogueWillPower(uint64 level) internal pure returns(int64) {
		// Table values are the same
		return getRogueFortitude(level);
	}

	function getFighterFortitude(uint64 level) internal pure returns(int64) {
		if(level == 1) return 2;
		if(level == 2) return 3;
		if(level == 3) return 3;
		if(level == 4) return 4;
		if(level == 5) return 4;
		if(level == 6) return 5;
		if(level == 7) return 5;
		if(level == 8) return 6;
		if(level == 9) return 6;
		if(level >= 10) return 7;
	}

	function getFighterReflex(uint64 level) internal pure returns(int64) {
		if(level == 1) return 0;
		if(level == 2) return 0;
		if(level == 3) return 1;
		if(level == 4) return 1;
		if(level == 5) return 1;
		if(level == 6) return 2;
		if(level == 7) return 2;
		if(level == 8) return 2;
		if(level == 9) return 3;
		if(level >= 10) return 3;
	}

	function getFighterWillPower(uint64 level) internal pure returns(int64) {
		// Table values are the same
		return getFighterReflex(level);
	}

	function getBarbarianFortitude(uint64 level) internal pure returns(int64) {
		if(level == 1) return 2;
		if(level == 2) return 3;
		if(level == 3) return 3;
		if(level == 4) return 4;
		if(level == 5) return 4;
		if(level == 6) return 5;
		if(level == 7) return 5;
		if(level == 8) return 6;
		if(level == 9) return 6;
		if(level >= 10) return 7;
	}

	function getBarbarianReflex(uint64 level) internal pure returns(int64) {
		if(level == 1) return 0;
		if(level == 2) return 0;
		if(level == 3) return 1;
		if(level == 4) return 1;
		if(level == 5) return 1;
		if(level == 6) return 2;
		if(level == 7) return 2;
		if(level == 8) return 2;
		if(level == 9) return 3;
		if(level >= 10) return 3;
	}

	function getBarbarianWillPower(uint64 level) internal pure returns(int64) {
		// Table values are the same
		return getBarbarianReflex(level);
	}

	function setCharacterCombatStats(string memory class, uint64 level) public {
		int64 initiative = playerSheetStats.dexterityModifier;
		int64 armorClass = 10;
		int64 baseBonusAttack = getBaseBonusAtack(class, level);
		int64 hitDice = getClassHitDice(class);
		playerCombatStats = CombatCharacterStats({
			initiative: initiative,
			armorClass: armorClass,
			hitDice: hitDice,
			totalHitPoints: hitDice,
			currentHitPoints: hitDice,
			baseBonusAttack: baseBonusAttack
		});
	}

	function getClassHitDice(string memory class) internal pure returns(int64) {
		if(compareStrings("Barbarian", class)) {
			return 12;
		}
		if(compareStrings("Rogue", class)) {
			return 6;
		}
		if(compareStrings("Fighter", class)) {
			return 10;
		}
		return 4;
	}

	function getBaseBonusAtack(string memory class, uint64 level) internal pure returns(int64) {
		if(compareStrings("Barbarian", class)) {
			return getBarbarianBBA(level);
		}
		if(compareStrings("Rogue", class)) {
			return getRogueBBA(level);
		}
		if(compareStrings("Figther", class)) {
			return getFighterBBA(level);
		}
		return 0;
	}

	function getBarbarianBBA(uint64 level) internal pure returns(int64) {
		if(level == 1) return 1;
		if(level == 2) return 2;
		if(level == 3) return 3;
		if(level == 4) return 4;
		if(level == 5) return 5;
		if(level == 6) return 6;
		if(level == 7) return 7;
		if(level == 8) return 8;
		if(level == 9) return 9;
		if(level >= 10) return 10;
	}
	
	function getRogueBBA(uint64 level) internal pure returns(int64) {
		if(level == 1) return 0;
		if(level == 2) return 1;
		if(level == 3) return 2;
		if(level == 4) return 3;
		if(level == 5) return 3;
		if(level == 6) return 4;
		if(level == 7) return 5;
		if(level == 8) return 6;
		if(level == 9) return 6;
		if(level >= 10) return 7;
	}

	function getFighterBBA(uint64 level) internal pure returns(int64) {
		if(level == 1) return 1;
		if(level == 2) return 2;
		if(level == 3) return 3;
		if(level == 4) return 4;
		if(level == 5) return 5;
		if(level == 6) return 6;
		if(level == 7) return 7;
		if(level == 8) return 8;
		if(level == 9) return 9;
		if(level >= 10) return 10;
	}
}