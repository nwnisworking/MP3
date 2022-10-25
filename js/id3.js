export const ID3_TAG = Object.freeze({
	/** Audio Encryption */
	AENC : 0, 
	/** Audio Seek Point Index */
	ASPI : 1, 
	/** Attached Picture */
	APIC : 2, 
	/** Comments */
	COMM : 3, 
	/** Commercial Frame */
	COMR : 4, 
	/** Encryption Method Registration */
	ENCR : 5, 
	/** Equalization */
	EQUA : 6, 
	/** Equalization */
	EQU2 : 6, 
	/** Event Timing Codes */
	ETCO : 7, 
	/** General Encapsulated Object */
	GEOB : 8, 
	/** Group Identification Registration */
	GRID : 9, 
	/** Linked Information */
	LINK : 10, 
	/** Music CD Identifier */
	MCDI : 11, 
	/** MPEG Location Lookup Table */
	MLLT : 12, 
	/** Ownership Frame */
	OWNE : 13, 
	/** Private Frame */
	PRIV : 14, 
	/** Play Counter */
	PCNT : 15, 
	/** Popularimeter */
	POPM : 16, 
	/** Position Synchronisation Frame */
	POSS : 17, 
	/** Recommended Buffer Size */
	RBUF : 18, 
	/** Relative Volume Adjustment */
	RVAD : 19, 
	/** Relative Volume Adjustment */
	RVA2 : 19, 
	/** Reverb */
	RVRB : 20, 
	/** Seek Frame */
	SEEK : 21, 
	/** Signature Frame */
	SIGN : 22, 
	/** Synchronized Lyric/Text */
	SYLT : 23, 
	/** Synchronized Tempo Codes */
	SYTC : 24, 
	/** Beats Per Minute */
	TBPM : 25, 
	/** Initial Key */
	TKEY : 26, 
	/** Content Type */
	TCON : 27, 
	/** Mood */
	TMOO : 28, 
	/** Copyright Message */
	TCOP : 29, 
	/** Date */
	TDAT : 30, 
	/** Recording Dates */
	TRDA : 31, 
	/** Recording Time */
	TDRC : 32, 
	/** Time */
	TIME : 33, 
	/** Year */
	TYER : 34, 
	/** Release Time */
	TDRL : 35, 
	/** Tagging Time */
	TDTG : 36, 
	/** Encoding Time */
	TDEN : 37, 
	/** Encoded By */
	TENC : 38, 
	/** Software/Hardware And Settings Used For Encoding */
	TSSE : 39, 
	/** Playlist Delay */
	TDLY : 40, 
	/** Content Group Description */
	TIT1 : 41, 
	/** Title/Songname/Content Description */
	TIT2 : 42, 
	/** Subtitle/Description refinement */
	TIT3 : 43, 
	/** Album/Movie/Show title */
	TALB : 44, 
	/** Language */
	TLAN : 45, 
	/** Length */
	TLEN : 46, 
	/** Size */
	TSIZ : 47, 
	/** File Type */
	TFLT : 48, 
	/** Media Type */
	TMED : 49, 
	/** File Owner/Licensee */
	TOWN : 50, 
	/** Lead performer(s)/Soloist(s) */
	TPE1 : 51, 
	/** Band/Orchestra/Accompaniment */
	TPE2 : 52, 
	/** Conductor/Performer Refinement */
	TPE3 : 53, 
	/** Interpreted, Remixed, Or Otherwise Modified By */
	TPE4 : 54, 
	/** Composer */
	TCOM : 55, 
	/** Lyricist/Text Writer */
	TEXT : 56, 
	/** Involved People List */
	IPLS : 57, 
	/** Involved People List */
	TIPL : 57, 
	/** Musician Credits List */
	TMCL : 58, 
	/** Original Album/Movie/Show Title */
	TOAL : 59, 
	/** Original Filename */
	TOFN : 60, 
	/** Original Lyricist(s)/Text Writer(s) */
	TOLY : 61, 
	/** Original Artist(s)/Performer(s) */
	TOPE : 62, 
	/** Original Release Year */
	TORY : 63, 
	/** Original Release Year */
	TDOR : 63, 
	/** Track Number/Position In Set */
	TRCK : 64, 
	/** Part Of A Set */
	TPOS : 65, 
	/** Set Subtitle */
	TSST : 66, 
	/** Produced Notice */
	TPRO : 67, 
	/** Publisher */
	TPUB : 68, 
	/** Internet Radio Station Name */
	TRSN : 69, 
	/** Internet Radio Station Owner */
	TRSO : 70, 
	/** Album Sort Order */
	TSOA : 71, 
	/** Performer Sort Order */
	TSOP : 72, 
	/** Title Sort Order */
	TSOT : 73, 
	/** International Standard Recording Code */
	TSRC : 74, 
	/** User Defined Text Information Frame */
	TXXX : 75, 
	/** Unique File Identifier */
	UFID : 76, 
	/** Terms Of Use */
	USER : 77, 
	/** Unsynchronized Lyric/Text Transcription */
	USLT : 78, 
	/** Commercial Information */
	WCOM : 79, 
	/** Copyright/Legal Information */
	WCOP : 80, 
	/** Official Audio File Webpage */
	WOAF : 81, 
	/** Official Artist/Performer File Webpage */
	WOAR : 82, 
	/** Official Audio Source File Webpage */
	WOAS : 83, 
	/** Official Internet Radio Station Homepage */
	WORS : 84, 
	/** Payment */
	WPAY : 85, 
	/** Publishers Official Webpage */
	WPUB : 86, 
	/** User Defined URL Link Frame */
	WXXX : 87,

	// tagID(id){return Object.entries(ID3_TAG).reduce((p, [key, val])=>(p[val] = key, p), {})}
})

const decoder = new TextDecoder()

export default class ID3{
	tag
	version
	flag
	size
	data = []
	
	/**
	 *  
	 * @param {DataView} data 
	 */
	constructor(data){
		this.tag = decoder.decode(data.buffer.slice(0, 3))
		this.version = data.getUint16(3, true)
		this.flag = data.getUint8(5)
		this.size = (
			data.getUint8(6) << 7 * 3 |
			data.getUint8(7) << 7 * 2 |
			data.getUint8(8) << 7 |
			data.getUint8(9)
		) + 10

		for(let i = 10; i < this.size; i+= 10){
			const name = decoder.decode(data.buffer.slice(i, i + 4)),
						size = data.getUint32(i + 4),
						text = decoder.decode(data.buffer.slice(i + 10, size + i + 10))

			this.data.push({name, size, text})
			i+= size
		}
	}

	/**
	 * Write ID3 tag
	 * @param {number} tag 
	 * @param {string} text
	 */
	write(key, text){
		key = Object.keys(ID3_TAG).find(e=>ID3_TAG[e] === key)
		this.data.push({name : key, size : text.length + 1, text : "\0" + text})
		return this
	}
}