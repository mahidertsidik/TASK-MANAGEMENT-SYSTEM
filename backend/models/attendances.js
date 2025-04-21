import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    day: { type: String, required: true },
    timeIn: { type: String },
    timeOut: { type: String },
    workingHours: { type: String}
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
