import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: '',
    studentnumber: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
  //폼 필드의 값이 변경될 때 호출되는 이벤트 핸들러 함수 정의
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };//name과 value 추출하여 폼 필드 값 업데이트

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.terms) newErrors.terms = "서비스 약관에 동의해야 합니다.";
      if (!formData.privacy) newErrors.privacy = "개인 정보 수집 및 이용에 동의해야 합니다.";
    } else if (step === 2) {
      if (!formData.username) newErrors.username = "아이디를 입력해주세요.";
      if (!formData.password) newErrors.password = "비밀번호를 입력해주세요.";
      if (!formData.confirmPassword) newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "비밀번호가 다릅니다.";
      if (!formData.name) newErrors.name = "이름을 입력해주세요.";
      if (!formData.email) newErrors.email = "이메일을 입력해주세요.";
      if (!formData.phone) newErrors.phone = "전화번호를 입력해주세요.";
      if (!formData.studentnumber) newErrors.studentnumber = "학번을 입력해주세요.";
    }
    //단계 따라 폼 데이터 검증하는 함수
    //에러 있으면 newErrors객체에 추가 - 없을시 True반환 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };//현재 단계의 검증을 통과할 시 다음 단계로 이동

  const prevStep = () => setStep(step - 1);
  //이전 단계로 이동

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log(formData);
      navigate('/login'); // 회원가입 완료 후 로그인 페이지로 이동
    }
  };
  
  return (
    <div className="SignUp">
      /*<header className="signup-header">
        <div className="return">
          <Link to="/">홈으로 돌아가기</Link>
        </div>
      </header>

      <h2>회원가입</h2>
      <div className="signup-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>{/*회원가입 상태를 시각적으로 표시하는 진행 막대*/}
      <div className="signup-content">
        <form className="signup-form" onSubmit={handleSubmit}>
        {/*폼 제출시 hanldesubmit함수 호출*/}
          {step === 1 && (
            <div className="step">
              <h3>약관 동의</h3>
              <div className="form-group">
                <label>서비스 약관 동의</label>
                <textarea readOnly value="약관 내용" />
                <input type="checkbox" name="terms" onChange={handleChange} /> 동의합니다.
                {errors.terms && <p className="error">{errors.terms}</p>}
              </div>
              <div className="form-group">
                <label>개인 정보 수집 및 이용 동의</label>
                <textarea readOnly value="개인 정보 수집 및 이용 동의 내용" />
                <input type="checkbox" name="privacy" onChange={handleChange} /> 동의합니다.
                {errors.privacy && <p className="error">{errors.privacy}</p>}
               {/*동의하지 않으면 에러*/}
              </div>
              <button type="button" onClick={nextStep}>다음</button>
             {/*다음 버튼 클릭하면 nextStep함수 호출*/}
            </div>
          )}
          {step === 2 && (
            <div className="step">
              <h3>정보 입력</h3>
              <div className="form-group">
                <label htmlFor="username">아이디</label>{/*label:필드에 대한 설명 제공*/}
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                {/*id:input요소의 id가 username으로 설정되어 htmlFor속성과 연결되어 사용자 경험을 개선함
                   name:폼 제출 시 필드 값이 username으로 전송됨
                   value=...:value속성이 form...으로 설정-formdata객체의 username속성을 필드에 양방향 데이터 바인딩
                    *바인딩: 데이터와 ui요소를 연결하는 개념-양방향 데이터 바인딩: 변경이 자동으로 업데이트되는 것
                   onchange:사용자가 입력 필드 값을 변경할 때마다 handleChange함수가 호출되어formdata업데이트
                */}
                {errors.username && <p className="error">{errors.username}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">비밀번호 확인</label>
                <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">전화번호</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="studentnumber">학번</label>
                <input type="text" id="studentnumber" name="studentnumber" value={formData.studentnumber} onChange={handleChange} required />
                {errors.studentnumber && <p className="error">{errors.studentnumber}</p>}
              </div>
              <button type="button" onClick={prevStep}>이전</button>
              <button type="button" onClick={nextStep}>다음</button>
            </div>
          )}
          {step === 3 && (
            <div className="step">
              <h3>가입 완료</h3>
              <p>가입이 완료되었습니다. 아래 버튼을 클릭하여 로그인하세요.</p>
              <button type="submit">회원가입 완료</button>{/*이 버튼을 눌렀을 때 navigate가 쓰여서 ./Login으로 옮겨가야함*/}
            </div>
          )}
        </form>
      </div>
      <footer>
        <p>© 2024 CNU </p>
        <div className="footer-links">
          <a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/privacy">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default SignUp;
