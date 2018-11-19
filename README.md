# Time to Fix

  Community site to calculate vulnerability time to fix statistics.


## Requirements

   * [Node.js](https://nodejs.org/en/); tested with 8.9.4, 8.11.3 LTS, and 11.1.0.
   * [NPM](https://www.npmjs.com); tested with 5.6.0, 6.1.0, 6.3.0, and 6.4.1.
   * [Meteor](https://www.meteor.com); tested with 1.6.0 and 1.8.0


## Notes

   TODO


## Installation

   `git clone https://github.com/lkremkow/time-to-fix.git time-to-fix`

   `cd time-to-fix/`

   `npm install`

   `export TTFSALT=<random string>`

   `meteor run`


## Re-Installation

   `cd time-to-fix/`

   `git fetch --all`

   `git reset --hard origin/master`

   `git pull origin master`


## Source

   https://github.com/lkremkow/time-to-fix.git


## Usage

   TODO: How to use these scripts.

   Usernames are stored in the database such that mutliple findings of the same perimeter are being considered as 1 and not multiple.

   The usernames are hashed to preudo-anonymize the perimeters and users concerned.

   To prevent looking up the entry data, we use a salt that is stored in the environment variable "TTFSALT".


## Contributing

   TODO: Write instructions how to reports bugs and contribute. Link to public repository.


## History

   TODO: Write history.


## Credits

   TODO: Write credits.


## License

   Copyright (C) 2018 Leif Kremkow <kremkow@tftg.net> (http://www.tftg.com)

   This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, version 3 of the License.

   This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public License along with this program. If not, see <http://www.gnu.org/licenses/>.
