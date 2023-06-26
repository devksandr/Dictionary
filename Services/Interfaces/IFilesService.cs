using dict_react.Models.DTO;

namespace dict_react.Services.Interfaces;

public interface IFilesService
{
    IEnumerable<FileCreateResponseDTO> AddFiles(FileCreateRequestDTO filesModel);
    FileGetResponseDTO GetFile(int fileId);
    IEnumerable<FileGetInfoResponseDTO> GetAllFilesInfo();
    bool DeleteFile(int fileId);
}