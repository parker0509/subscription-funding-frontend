import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // ✅ location 추가
import axios from "axios";
import "./Project.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ 현재 페이지 정보 가져오기
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/projects/${id}`)
      .then((response) => setProject(response.data))
      .catch((error) => console.error("프로젝트 정보를 불러오는 중 오류 발생:", error));
  }, [id]);

    const handleInvestClick = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("로그인이 필요합니다!");
        navigate("/login", { state: { from: location } });
        return;
      }

      const amount = prompt("투자할 금액을 입력하세요 (숫자만):");
      if (amount && !isNaN(amount)) {
        // 여기에서 fundingId를 URL 경로에 포함시킴
        axios.post(`http://localhost:8080/funding/${id}/support`, null, {
          params: {
            amount: amount,
            isSuccess: true // isSuccess 값 확인
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(() => {
          alert("투자가 완료되었습니다!");
          window.location.reload();
        }).catch(err => {
          console.error("투자 중 오류:", err);
          alert("투자에 실패했습니다.");
        });
      } else {
        alert("올바른 금액을 입력해주세요.");
      }
    };

  if (!project) return <p className="loading">프로젝트 정보를 불러오는 중...</p>;

  return (
    <div className="project-detail">
      <h2>{project.name}</h2>
      <img src={project.imageUrl || "https://via.placeholder.com/600"} alt={project.name} className="detail-image" />
      <p>{project.description}</p>
      <p className="goal">목표 금액: {project.goalAmount.toLocaleString()} 원</p>
      <p className="raised">현재 모금액: {project.raisedAmount.toLocaleString()} 원</p>
      <p className="status">상태: {project.status}</p>

      {/* ✅ 투자하기 버튼 */}
      <button onClick={handleInvestClick} className="invest-button">투자하기</button>
    </div>
  );
};

export default ProjectDetail;
