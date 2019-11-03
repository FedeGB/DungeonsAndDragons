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

	BaiscCharacterRecordSheet public playerSheet;

	StatsCharacterRecordSheet public playerSheetStats;

	constructor() public payable {
	    creator = msg.sender;
	    createdAt = now;
	    balances[msg.sender] = 10000;
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
	}

}