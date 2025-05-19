import AppointmentModal from './modals/AppointmentModal';
import ConfirmModal from './modals/ConfirmModal';
import { useModal } from '../hooks/useModal';

const ModalRenderer = () => {
    const { modal, closeModal } = useModal();

    switch (modal.type) {
        case 'appointment':
            return <AppointmentModal officeId={modal.props.officeId} onClose={closeModal} />;
        case 'confirm':
            return <ConfirmModal onClose={closeModal} onConfirm={modal.props.onConfirm} message={modal.props.message} />
        case 'reschedule':
            return <AppointmentModal officeId={modal.props.appointment.schedule.user.offices[0].id} onClose={closeModal} appointment={modal.props.appointment} />
        default:
            return null;
    }
};

export default ModalRenderer;
