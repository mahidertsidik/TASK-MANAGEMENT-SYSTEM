import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Textarea,
    Tag,
    Select,
} from '@chakra-ui/react';
import axios from 'axios';
import { useToast, Spinner } from '@chakra-ui/react';

function AddProjectModal({ isOpen, onClose }) {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [employeesData, setEmployeesData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        clientName: '',
        startDate: '',
        status: 'active',
        manager: '',
        team: []
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStatusClick = (status) => {
        setFormData({ ...formData, status });
    };

    const token = localStorage.getItem("tm_token");
    const axiosInstance = axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const getEmployees = async () => {
        try {
            const response = await axiosInstance.get('/api/employees');
            setEmployeesData(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            toast({
                title: 'Failed to load employees.',
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Verify if manager is selected
        if (!formData.manager) {
            toast({
                title: 'Please select a project manager.',
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }

        try {
            // Post project data to the backend
            const response = await axiosInstance.post('/api/projects', formData);

            setFormData({
                name: '',
                description: '',
                clientName: '',
                startDate: '',
                status: 'active',
                manager: '',
                team: []
            });

            let message = response.data.message || 'Project created successfully';
            toast({
                title: message,
                status: 'success',
                position: 'top',
                duration: 5000,
                isClosable: true,
            });

            setLoading(false);
            onClose(); // Close modal after successful submission
        } catch (error) {
            setLoading(false);
            // Detailed error handling
            let errorMessage = error.response?.data?.message || 'Something went wrong.';
            toast({
                title: errorMessage,
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={false} isCentered>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit}>
                    <ModalHeader>Add Project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            mt={3}
                            mb={3}
                            placeholder='Project Name'
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <Textarea
                            rows={7}
                            mt={3}
                            mb={3}
                            placeholder='Description'
                            type='text'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            mt={3}
                            mb={3}
                            placeholder='Client Name'
                            type='text'
                            name='clientName'
                            value={formData.clientName}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            mt={3}
                            mb={3}
                            placeholder="Start Date"
                            type="date"
                            name='startDate'
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                        <Select
                            mt={3}
                            mb={3}
                            placeholder='Project Manager'
                            name='manager'
                            value={formData.manager}
                            onChange={handleChange}
                            required
                        >
                            {employeesData.map(employee => (
                                <option key={employee._id} value={employee._id}>
                                    {`${employee.firstName} ${employee.lastName}`}
                                </option>
                            ))}
                        </Select>

                        <div className='priority-container'>
                            <p>Status: </p>
                            <Tag
                                size='lg'
                                cursor={'pointer'}
                                colorScheme={formData.status === 'active' ? 'green' : 'gray'}
                                borderRadius='full'
                                onClick={() => handleStatusClick('active')}
                            >
                                <p className='tag-text'>Active</p>
                            </Tag>
                            <Tag
                                size='lg'
                                cursor={'pointer'}
                                colorScheme={formData.status === 'completed' ? 'blue' : 'gray'}
                                borderRadius='full'
                                onClick={() => handleStatusClick('completed')}
                            >
                                <p className='tag-text'>Completed</p>
                            </Tag>
                            <Tag
                                size='lg'
                                cursor={'pointer'}
                                colorScheme={formData.status === 'on-hold' ? 'yellow' : 'gray'}
                                borderRadius='full'
                                onClick={() => handleStatusClick('on-hold')}
                            >
                                <p className='tag-text'>On Hold</p>
                            </Tag>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='solid' color="white" bg='darkcyan' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='outline' type='submit'>
                            {loading ? <Spinner color='green' /> : 'Add Project'}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}

export default AddProjectModal;
