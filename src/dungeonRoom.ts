import sha256 from 'crypto-js/sha256'
import base64 from 'crypto-js/enc-base64'

type RoomType = IRoom | null | 'blocked'

interface IRoom {
    id: string
    north: RoomType
    south: RoomType
    west: RoomType
    east: RoomType
    height: number
    width: number
    x: number
    y: number
}

class DungeonRoom {
    constructor(next?: DungeonRoom) {
        this.id = base64.stringify(sha256(`${Date.now()}salt`))
        this.north = null
        this.south = null
        this.west = null
        this.east = null
        this.height = 1
        this.width = 1
        this.x = 0
        this.y = 0
    }

    // IRoom properties
    id: string
    north: RoomType
    south: RoomType
    west: RoomType
    east: RoomType
    height: number
    width: number
    x: number
    y: number
}

export { DungeonRoom, IRoom, RoomType }