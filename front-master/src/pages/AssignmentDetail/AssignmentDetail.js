import './AssignmentDetail.css';
import React, { useState } from 'react';
import { IoMenu, IoAddCircle, IoPerson, IoBookmark } from "react-icons/io5";


function AssignmentDetail() {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('Initial Title');
    const [content, setContent] = useState('This is the initial content.');
    const [dropdownValues, setDropdownValues] = useState({
        role: 'Option 1',
        type: 'Option 1',
        diff: 'Option 1',
    });
    const [deadline, setDeadline] = useState('');
    const [file, setFile] = useState(null);
    const [link, setLink] = useState('https://example.com');
    const [isDeleted, setIsDeleted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const [showPopup, setShowPopup] = useState(false);
    const [newProject, setNewProject] = useState({
        githubLink: '',
        goal: '',
        professorName: '',
        teamName: '',
        deadline: '',
        subject: '',
        projectName: '',
        teamMembers: [],
    });
    const [studentID, setStudentID] = useState('');

    const handleCreateProject = () => {
        setShowPopup(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = () => {
        setIsDeleted(true);
    };

    if (isDeleted) {
        return <div>Post has been deleted.</div>;
    };

    const handleDropdownChange = (e) => {
        const { name, value } = e.target;
        setDropdownValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProject({ ...newProject, [name]: value });
    };

    const handleSearchChange = (e) => {
        setStudentID(e.target.value);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
      };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const handleAddTeamMember = () => {
        const contribution = Math.floor(Math.random() * 100);
        const newMember = {
            id: studentID,
            contribution,
            color: `rgba(188, 13, 18, ${contribution / 100})`,
        };
        setNewProject(prevProject => ({
            ...prevProject,
            teamMembers: [...prevProject.teamMembers, newMember]
        }));
        setStudentID('');
    };

    const handleAddProject = () => {
        setProjects([...projects, newProject]);
        setNewProject({
            githubLink: '',
            goal: '',
            professorName: '',
            teamName: '',
            deadline: '',
            subject: '',
            projectName: '',
            teamMembers: [],
        });
        setShowPopup(false);
    };

    return (
        <div className="As-detail">
            <header className="As-detail-header">
                <div className="my-page-logout">
                    <IoPerson size={24} />
                    <a href="/mypage">마이페이지</a> | <a href="/logout">로그아웃</a>
                </div>
            </header>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <IoMenu size={24} />
            </button>
            <aside className={`App-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    <div className="create-project" onClick={handleCreateProject}>
                        <IoAddCircle size={32} style={{ color: 'red' }} />
                        <p>프로젝트 생성하기</p>
                    </div>
                    <div className="my-projects">
                        <h2>내 프로젝트</h2>
                        {projects.map((project, index) => (
                            <div className="project-item" key={index}>
                                <p>{project.projectName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
            <main>
                <div editable-post>
                    {isEditing ? (
                        <div>
                            <div className="setting">
                                <select
                                    name="role"
                                    value={dropdownValues.role}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="role">담당자</option>
                                    <option value="Option 2">Option 2</option>
                                    <option value="Option 3">Option 3</option>
                                </select>
                                <select
                                    name="type"
                                    value={dropdownValues.type}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="type">과제분류</option>
                                    <option value="Option 2">Option 2</option>
                                    <option value="Option 3">Option 3</option>
                                </select>
                                <select
                                    name="diff"
                                    value={dropdownValues.diff}
                                    onChange={handleDropdownChange}
                                >
                                    <option value="diff">과제복잡도</option>
                                    <option value="Option 2">Option 2</option>
                                    <option value="Option 3">Option 3</option>
                                </select>
                                <input
                                    type="date"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                />
                            </div>
                            <div className="text-input">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div>
                                <input type="file" onChange={handleFileChange} />
                                {file && (
                                    <div>
                                        <span>{file.name}</span>
                                        <button onClick={() => setFile(null)}>삭제</button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                />
                                <button onClick={() => setLink('')}>삭제</button>
                            </div>
                            <div className="button-row">
                                <button onClick={handleSave}>저장</button>
                            </div>
                        </div>
                    ) : (
                        <div className="view">

                            <div className="inform">
                                <h3>과제 상태:</h3>
                                <p>담당자: {dropdownValues.dropdown1}</p>
                                <p>과제분류: {dropdownValues.dropdown2}</p>
                                <p>과제복잡도: {dropdownValues.dropdown3}</p>
                                <p>마감기한: {deadline ? new Date(deadline).toLocaleDateString() : '미정'}</p>
                            </div>
                            <div className="substance">
                                <h2>{title}</h2>
                                <p>{content}</p>

                                {file && (
                                    <div>
                                        <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                                            {file.name}
                                        </a>
                                    </div>
                                )}
                                {link && (
                                    <div>
                                        <a href={link} target="_blank" rel="noopener noreferrer">
                                            {link}
                                        </a>
                                    </div>
                                )}
                                <div className="button-row">
                                    <button onClick={handleEdit}>수정</button>
                                    <button onClick={handleDelete}>삭제</button>
                                </div>
                            </div>
                            <div className="comment">
                                <p>댓글 입력</p>
                            </div>
                        </div>
                    )}
                </div>


            </main>

            {showPopup && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>새 프로젝트 생성</h2>
                        <label>
                            프로젝트명:
                            <input
                                type="text"
                                name="projectName"
                                value={newProject.projectName}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            깃허브 팀 링크:
                            <input
                                type="text"
                                name="githubLink"
                                value={newProject.githubLink}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            프로젝트 목표:
                            <input
                                type="text"
                                name="goal"
                                value={newProject.goal}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            교수님명:
                            <input
                                type="text"
                                name="professorName"
                                value={newProject.professorName}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            팀명 (추천):
                            <input
                                type="text"
                                name="teamName"
                                value={newProject.teamName}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            마감기한:
                            <input
                                type="date"
                                name="deadline"
                                value={newProject.deadline}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            과목:
                            <input
                                type="text"
                                name="subject"
                                value={newProject.subject}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            팀원 추가 (학번 입력):
                            <input
                                type="text"
                                value={studentID}
                                onChange={handleSearchChange}
                            />
                            <button onClick={handleAddTeamMember}>추가</button>
                        </label>
                        <div className="added-members">
                            <h4>추가된 팀원:</h4>
                            <ul>
                                {newProject.teamMembers.map((member, idx) => (
                                    <li key={idx}>
                                        {member.id}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={handleAddProject}>프로젝트 생성</button>
                        <button onClick={handleClosePopup}>취소</button>
                    </div>
                </div>
            )}
        </div>

    );

};

export default AssignmentDetail;