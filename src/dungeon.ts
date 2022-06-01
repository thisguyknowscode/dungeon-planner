import { NewLineKind } from 'typescript'
import { DungeonRoom, IRoom, RoomType } from './dungeonRoom'

type FloorPlanType = Array<Array<any>>

enum DoorsEnum {
	north,
	west,
	south,
	east,
}

interface ILocation {
	map: FloorPlanType,
	room: IRoom,
}

/**
 * fills the map with rooms
 * @param size The length and width of the map. Must be a positive integer.
 */
const Generator = (size: number) => {
	if (!validateSize(size)) {
		console.error(`The size "${size}" is invalid.`)
	}

	const floorPlan = squareFloorPlan(size)

	const { newRoom, map } = addRoom(floorPlan.map, null, 0, 0)

	if (newRoom.north == null && shouldBuildRoom()) { newRoom.north = addRoom(map, newRoom, -1, 0).newRoom }
	if (newRoom.south == null && shouldBuildRoom()) { newRoom.south = addRoom(map, newRoom, 1, 0).newRoom }
	if (newRoom.east == null && shouldBuildRoom()) { newRoom.east = addRoom(map, newRoom, 0, -1).newRoom }
	if (newRoom.west == null && shouldBuildRoom()) { newRoom.west = addRoom(map, newRoom, 0, 1).newRoom }

	return floorPlan
}

const shouldBuildRoom = () => !!(Math.floor(Math.random() * 2))

const addRoom = (map: FloorPlanType, room: IRoom | null, x: number, y: number) => {
	const newRoom = new DungeonRoom()

	if (!room) {
		// Must be the first tile
		const columns = map.length
		const rows = map[0].length

		newRoom.x = Math.ceil(columns / 2) - 1
		newRoom.y = Math.ceil(rows / 2) - 1
	} else {
		newRoom.x = room.x + x
		newRoom.y = room.y + y
	}

	map[newRoom.x][newRoom.y] = newRoom

	return {
		newRoom,
		map,
	}
}

/**
 * 
 * @param size: length of one side of a square 
 * @returns 
 */
const squareFloorPlan = (size: number) => {
	const map: FloorPlanType = []

	for (let i = 0; i < size; i += 1) {
		const a: Array<number> = new Array(size)
		map.push(a)
	}

	return {
		map,
	}
}

const validateSize = (size: number) => {
	return size % 2 === 1 || size > 0 || Math.ceil(size) !== Math.floor(size)
}

export { Generator, FloorPlanType }