import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { useModal } from '../hooks/useModal';

const useScheduleAppointment = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { openModal } = useModal();

    const scheduleAppointment = (office) => {
        if (!user) {
            navigate('/login');
            return;
        }

        openModal('appointment', { office });
    };

    return { scheduleAppointment };
};

export default useScheduleAppointment;
