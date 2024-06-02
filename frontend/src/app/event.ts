export class Event {
    private club: string;
    private desc: string;
    private link: string;

	constructor($club: string, $desc: string, $link: string) {
		this.club = $club;
		this.desc = $desc;
		this.link = $link;
	}

    /**
     * Getter $club
     * @return {string}
     */
	public get $club(): string {
		return this.club;
	}

    /**
     * Getter $desc
     * @return {string}
     */
	public get $desc(): string {
		return this.desc;
	}

    /**
     * Getter $link
     * @return {string}
     */
	public get $link(): string {
		return this.link;
	}

    /**
     * Setter $club
     * @param {string} value
     */
	public set $club(value: string) {
		this.club = value;
	}

    /**
     * Setter $desc
     * @param {string} value
     */
	public set $desc(value: string) {
		this.desc = value;
	}

    /**
     * Setter $link
     * @param {string} value
     */
	public set $link(value: string) {
		this.link = value;
	}

    
}
