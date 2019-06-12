pragma solidity ^0.5.0;

contract DungeonsAndDragons {

	address public creator;
	uint public createdAt;

	mapping (address => int) public balances;

/*	enum race {
		HALFELF,
		HALFORC,
		HUMAN,
		DWARF,
		GNOME,
		ELF,
		HALFLING,
		DRAGONBORN,
		TIEFLING
	}

    enum class {
		DRUID,
		ROGUE,
		FIGHTER,
		WARLOCK,
		BARBARIAN,
		BARD,
		CLERIC,
		MONK,
		PALADIN,
		RANGER,
		SORCERER,
		WIZARD
	}
*/
	struct BaiscCharacterRecordSheet {
		// address characterBlockDir;
		string name;
		string player;
		string class;
		uint64 level;
		string race;
		uint64 size; // Might be a string
		uint64 age;
		string gender;
	}

	BaiscCharacterRecordSheet public playerSheet;

	constructor() public payable {
	    creator = msg.sender;
	    createdAt = now;
	    balances[msg.sender] = 10000;
	}

	function setBasicCharacterSheet(string memory name, string memory player, string memory class, uint64 level, string memory race, uint64 size, uint64 age, string memory gender) public {
		require(msg.sender == creator, "Only the creator of it\'s own player sheet can modify it\'s data");
		playerSheet = BaiscCharacterRecordSheet({name: name, player: player, class: class, level: level, race: race, size: size, age: age, gender: gender});
	}
}