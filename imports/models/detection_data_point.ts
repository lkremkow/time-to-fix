export interface Detection_Data_Point {
  _id?: string,
  origin: string,
  added_on: Date,
  qid: number,
  severity: number,
  port: number,
  ssl: boolean,
  present: boolean,
  fixed: boolean,
  ignored: boolean,
  times_detected: number,
  first_found: Date,
  last_found: Date,
  fixed_as_of: Date 
};