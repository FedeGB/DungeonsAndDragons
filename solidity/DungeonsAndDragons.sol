pragma solidity ^0.4.21;

contract DungeansAndDragons {

	enum race {
		HALFELF,
		HALFORC,
		HUMAN,
		DWARF,
		GNOME,
		ELF,
		HALFLING,
		DRAGONBORN,
		TIEFLING,
	}

	enum class {
		
	}

	struct BaiscCharacterRecordSheet {
		address characterBlockDir;
		string name;
		string player;
		string class;
		uint64 level;
		string race;
		string alignment;
		string deity;
		uint64 size; // Might be a string
		uint64 age;
		string gender;
		uint64 height; // centimeters
		uint64 weight; // kilograms
		string eyes;
		string hair;
		string skin;
	}
}